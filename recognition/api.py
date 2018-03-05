from __future__ import print_function
import sys
import zerorpc
from software import find as real_find
import gevent

class CalcApi(object):
    def find(self):
        found = findPerson()
        print(found)
        while not found:
            print("error")
            found = findPerson()
        return found

    def echo(self, text):
        """echo any text"""
        return text

def findPerson():
    try:
        return real_find()
    except Exception as e:
        return None
def parse_port():
    port = str(4243)
    try:
        port = int(sys.argv[1])
    except Exception as e:
        pass
    return '{}'.format(port)

def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(CalcApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    server = gevent.spawn(s.run())
    gevent.joinall([server])

if __name__ == '__main__':
    main()
