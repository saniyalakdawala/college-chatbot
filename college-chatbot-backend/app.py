import os
import json
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate

# --- Flask setup ---
app = Flask(__name__)
CORS(app)

# --- Initialize embeddings ---
print("Initializing embeddings model...")
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-large-en-v1.5")

# --- Load Chroma vector DB ---
print("Loading persistent vector database...")
try:
    db = Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )
    num_docs = db._collection.count()
    print(f"ChromaDB contains {num_docs} documents.")
except Exception as e:
    print(f"Error accessing ChromaDB: {e}. Please run ingest_data.py first.")
    db = None

retriever = db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
) if db else None

# --- Simple local LLM alternative ---
# Since we remove API key, we can use HuggingFace models locally (optional)
# Here, we'll just simulate streaming using retrieved chunks
def generate_local_response(prompt_text, retrieved_docs):
    # Just return the content of retrieved docs concatenated (simulate answer)
    if not retrieved_docs:
        return "I could not find anything relevant in the documents."
    response = ""
    for doc in retrieved_docs:
        response += doc.page_content + "\n\n"
    return response.strip()

# --- Prompt template ---
template = """You are a helpful assistant. Use the following pieces of context to answer the user's question.
If you don't know the answer, just say that you don't know.
----------------
CONTEXT: {context}
----------------
QUESTION: {question}
----------------
ANSWER:"""

rag_prompt = PromptTemplate(template=template, input_variables=["context", "question"])

print("Backend is ready to receive queries.")

# --- Greeting handler ---
def handle_greetings(query):
    greetings = ["hi", "hello", "hey", "what's up", "yo"]
    if query.lower().strip() in greetings:
        return "Hello! How can I help you today?"
    return None

# --- Streaming endpoint ---
@app.route("/search_and_stream", methods=["POST"])
def search_and_stream():
    data = request.json
    user_query = data.get("query", "")

    if not retriever:
        return jsonify({"answer": "Error: Vector database not loaded."}), 500

    # Handle greetings
    greeting_response = handle_greetings(user_query)
    if greeting_response:
        return jsonify({"answer": greeting_response})

    if not user_query:
        return jsonify({"answer": "Please provide a query."}), 400

    try:
        # Step 1: Retrieve relevant documents
        retrieved_docs = retriever.get_relevant_documents(user_query)
        context_text = "\n\n".join([doc.page_content for doc in retrieved_docs])

        # Step 2: Prepare prompt (not used for local streaming, just for structure)
        prompt_with_context = rag_prompt.format(context=context_text, question=user_query)

        # Step 3: Stream response as JSON lines (simulate streaming)
        def generate():
            response_text = generate_local_response(prompt_with_context, retrieved_docs)
            for chunk in response_text.split("\n\n"):
                yield json.dumps({"content": chunk}) + "\n"

        return Response(stream_with_context(generate()), mimetype='application/json')

    except Exception as e:
        print(f"Error processing streaming request: {e}")
        return jsonify({"answer": "An error occurred while generating a response."}), 500

# --- Run app ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
