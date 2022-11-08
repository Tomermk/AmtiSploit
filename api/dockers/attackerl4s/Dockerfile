FROM python:3-slim
RUN mkdir /app
ADD server.py /
RUN pip install requests
EXPOSE 8088
CMD python3 server.py