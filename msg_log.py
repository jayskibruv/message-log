from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
import os


class HelloHandler(BaseHTTPRequestHandler):

	def do_GET(self):
		if self.path == "/logs":
			self.handleLogList()
		else:
			self.handle404()


	def do_POST(self):
		if self.path == "/logs":
			self.handleLogCreate()
		else:
			self.handle404()


	# GET /log
	def handleLogList(self):

		fin = open('log.txt',"r")
		my_log = fin.readlines()
		fin.close()
		json_log = json.dumps(my_log)

		print("LIST: ", json_log)

		self.send_response(200)
		self.send_header("Access-Control-Allow-Origin","*")
		self.send_header("Content-type", "application/json")
		self.end_headers()
		self.wfile.write(bytes(json_log, "utf-8"))


		return

	# POST /log
	def handleLogCreate(self):
		length = self.headers['Content-Length']
		length = int(length)

		body = self.rfile.read(length).decode("utf-8")
		data = parse_qs(body)
		self.send_response(201)

		self.send_header("Access-Control-Allow-Origin","*")

		message = data['message'][0]
		print(message)

		fin = open('log.txt',"a")
		if fin != '':
			fin.write(message + '\n')
		else:
			fin.append(message + '\n')
		fin.close()


		self.end_headers()
		return

	def handle404(self):
		self.send_response(404)
		self.send_header("Content-type", "text/html")
		self.end_headers()
		self.wfile.write(bytes("<strong>404 Error: You dun goofed..</strong>","utf-8"))

def main():
	listen = ("127.0.0.1", 8080)
	server = HTTPServer(listen, HelloHandler)

	print("Listening...")
	server.serve_forever()

main()