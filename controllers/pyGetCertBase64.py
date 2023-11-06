import sys
import base64
import glob


from cryptography.hazmat.primitives import serialization, hashes
from lxml import etree

from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding, utils

import os
contents = os.listdir()


current_working_directory=os.getcwd()
# print("\nCurrent working directory:", current_working_directory)

parent_directory = os.path.abspath(os.path.join(current_working_directory, ".."))
# print(f'parent_directory: {parent_directory}')

xml_file_name="cfdi_2023-09-09_15-36-41"

def encodeCertificadoBase64():
    if len(sys.argv) != 3 or sys.argv[1] != "--parameter":
        print("Usage: python pySelladoXML.py --parameter <folder>")
        return

    folder = sys.argv[2]
    cer_files = glob.glob(f"{current_working_directory}/storage/credentials/{folder}/*.cer")

    if len(cer_files) == 1:
        cer_file_path = cer_files[0]

        with open(cer_file_path, "rb") as cert_file:
            cert_data = cert_file.read()

        cert_base64 = base64.b64encode(cert_data).decode("utf-8")

        with open(f"{current_working_directory}/storage/credentials/{folder}/certificado_base64.txt", "w", encoding="utf-8") as base64_file:
            base64_file.write(cert_base64)

        print(cert_base64)
    else:
        if len(cer_files) == 0:
            print("No .cer files found in the folder.")
        else:
            print("Expected exactly one .cer file in the folder.")


encodeCertificadoBase64()