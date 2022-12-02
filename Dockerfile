FROM node
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install python3-venv -y
RUN apt-get install python3-pip -y
RUN apt-get install cmake g++ make -y
RUN apt-get install libsndfile1-dev -y
RUN apt-get install ffmpeg -y
COPY package.json .
RUN ["npm", "i"]
RUN ["npm", "i", "-D"]
RUN [ "pip3",  "install", "--default-timeout=100", "future" ]
COPY requirements1.txt .
RUN ["pip3", "install", "-r", "requirements1.txt"]
COPY requirements.txt .
RUN ["pip3", "install", "-r", "requirements.txt"]
COPY . .
EXPOSE 3000
# CMD ["python3", "./scripts/cheater.py","--email","email", "--userID", "AAAA", "--logID","80b602-a1c0-6457-373-ba3e1c86d6e"]
CMD ["npm", "run", "dev"]


