FROM node
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install python3-venv -y
RUN apt-get install python3-pip -y
COPY . .
# RUN ["python3", "-m", "venv", "."]
RUN ["pip3", "install", "-r", "requirements.txt"]
RUN ["npm", "i"]
RUN ["npm", "i", "-D"]
EXPOSE 3000
CMD ["npm", "run", "dev"]


