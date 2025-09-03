# MedConnect++

MedConnect++ is a simple healthcare web application that uses **machine learning** to predict diseases based on symptoms. The project combines **Flask (backend + ML)** and **React (frontend)** to give users an interactive way to check their health condition by selecting symptoms.

I built this project to learn **full-stack development** along with applying **AI/ML in a real-world scenario**.

---

## Features

* Disease prediction from symptoms using a trained ML model (Random Forest).
* User-friendly web interface built with React and Tailwind CSS.
* Dynamic symptoms list fetched from the backend.
* Probability-based prediction (not just the disease name).
* Separate backend (Flask) and frontend (React) setup.

---

## Project Structure

```
medconnect++
│── backend/              
│   ├── app.py            # Flask API
│   ├── train_model.py    # Training script
│   ├── disease_model.pkl # Saved model
│   ├── symptoms_list.pkl # Saved symptoms/features
│   └── dataset/          # Training & Testing CSVs
│
│── frontend/medconnect-ui/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/SymptomForm.js
│   └── package.json
│
│── README.md
```

---

## How to Run

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python train_model.py    # trains and saves the model
python app.py            # runs the flask server
```

The API will run at: `http://localhost:5000`

### Frontend (React)

```bash
cd frontend/medconnect-ui
npm install
npm start
```

Frontend will run at: `http://localhost:3000`



## How It Works

1. Dataset: Taken from Kaggle – Disease prediction using symptoms (41 diseases, 130+ symptoms).
2. Model: RandomForestClassifier trained on the dataset.
3. Backend: Flask serves two APIs – `/symptoms` (list of symptoms) and `/predict` (predicts disease).
4. Frontend: React app with checkboxes for symptoms, which sends data to backend and shows the result.

Example:

Input symptoms → fever, headache
Output → Predicted Disease: **Migraine** (72% confidence)



## Future Improvements

* Add login/signup for patients and doctors.
* Appointment booking system.
* Better disease explanations and treatment suggestions.
* Deploy both frontend and backend.



## Tech Stack

* **Frontend**: React, Tailwind CSS
* **Backend**: Flask, Flask-CORS
* **ML**: Scikit-learn, RandomForest
* **Languages**: Python, JavaScript



## Author

**Harshada Kokande**
B.Tech CSE (AI/ML) – DY Patil International University, Pune
GitHub: [Harshada\_kokande](https://github.com/Harshada_kokande)



Do you also want me to make it **even shorter & simpler** (like 1–2 sections only), so it looks like a college project README?
