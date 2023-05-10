

# simple python script
import sys

if len(sys.argv) > 1:
    input_arg = sys.argv[1]
    print(f"Hello, {input_arg}!", "from python script")
else:
    print("Hello from Python!")
