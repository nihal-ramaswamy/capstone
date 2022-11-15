FROM node
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install python3-venv -y
RUN apt-get install python3-pip -y
RUN apt-get install cmake g++ make -y
RUN apt-get install libsndfile1-dev -y
COPY package.json .
RUN ["npm", "i"]
RUN ["npm", "i", "-D"]
COPY requirements.txt .
RUN ["pip3", "install", "-r", "requirements.txt"]
COPY . .
EXPOSE 3000
CMD ["python3", "./scripts/cheater.py","--email","email", "--userID", "AAAA", "--logID","4a451cc-c54a-5ac1-40ab-c361c845602"]
# CMD ["npm", "run", "dev"]


