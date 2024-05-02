import sys
import base64
import glob
import asyncio


from cryptography.hazmat.primitives import serialization, hashes
from lxml import etree

from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding, utils

import os
import OpenSSL.crypto
contents = os.listdir()


current_working_directory=os.getcwd()
# print("\nCurrent working directory:", current_working_directory)

parent_directory = os.path.abspath(os.path.join(current_working_directory, ".."))
# print(f'parent_directory: {parent_directory}')


# xml_file_name="cfdi_2023-09-09_15-36-41"


def getCadenaOriginal(xml_name):
    xml_file_name=xml_name

    xml_file_path = f"{current_working_directory}/storage/documentos/{xml_name}.xml"
    #print(f'xml_file_path')
    try:
        print("im here 1")
        xml_doc = etree.parse(xml_file_path)

    except FileNotFoundError:
        print("im here 2")

        raise Exception(f"XML file not found {xml_file_name}")
        exit(1)
    except etree.ParseError:
        print("im here 3")

        raise Exception(f"Error parsing XML {xml_file_name}")
        exit(1)

    # Rest of your code for XML transformation goes here

   
    if xml_doc is not None:
        xsl_doc = etree.parse('http://www.sat.gob.mx/sitio_internet/cfd/4/cadenaoriginal_4_0/cadenaoriginal_4_0.xslt')

        # Create an XSLT transformer
        transformer = etree.XSLT(xsl_doc)

        # Perform the transformatio
        result_tree = transformer(xml_doc)

        # Convert the result tree to a string
        result_str = str(result_tree)

        # Save the transformed output to a text file
        output_directory = os.path.join(parent_directory, "BackendScooter mysql", "BackendScooter", "storage", "cadenaOriginal")
        output_file_path = os.path.join(output_directory, f'cadena_original_{xml_file_name}.txt')
        output_file_path = os.path.normpath(output_file_path)  # Normalize the path
        output_file_path = "../storage/cadenaOriginal/" #borrar
        with open(f'{current_working_directory}/storage/cadenaOriginal/cadena_original_{xml_file_name}.txt', 'w', encoding='utf-8') as output_file:
            output_file.write(result_str)

        # print(f"Transformation complete. Transformed output saved to '{current_working_directory}'.")


def getSelloShadow():
    if len(sys.argv) != 5 or sys.argv[1] != "--parameter" or sys.argv[3] != "--nombreXML":
        print("Usage: python pySelladoXML.py --parameter <folder> --nombreXML <xml_file_name>")
        return

    folder = sys.argv[2]
    xml_file_name = sys.argv[4]
    print(f'\n xml_file_name\n{xml_file_name}')
    cer_files = glob.glob(f"{current_working_directory}/storage/credentials/{folder}/*.cer")
    # key_files = glob.glob(f"{current_working_directory}/storage/credentials/{folder}/*.key")
    key_files = glob.glob(f"{current_working_directory}/storage/credentials/{folder}/*.key")
    if len(cer_files) == 1:
        cer_file_path = cer_files[0]

        # Step 1: Convert the certificate to PEM format
        with open(cer_file_path, "rb") as cert_file:
            cert_data = cert_file.read()

        cert = x509.load_der_x509_certificate(cert_data, default_backend())
        cert_pem = cert.public_bytes(encoding=serialization.Encoding.PEM)

        with open(f"{current_working_directory}/storage/credentials/{folder}/EKU9003173C9.cer.pem", "wb") as pem_file:
            pem_file.write(cert_pem)
        
        # Step 2: Convert the private key to PEM format
        if len(key_files) == 1:
            # key_file_path = glob.glob(f"{current_working_directory}/storage/credentials/{folder}/CSD_Sucursal_1_EKU9003173C9_20230517_223850.key")
            key_file_path = key_files[0]
            with open(key_file_path, "rb") as key_file:
                key_data = key_file.read()

            private_key = serialization.load_der_private_key(key_data, password=b'12345678a', backend=default_backend())

            private_key_pem = private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            )

            with open(f"{current_working_directory}/storage/credentials/{folder}/EKU9003173C9.key.pem", "wb") as pem_file:
                pem_file.write(private_key_pem)

            # Step 3: Generate the Digest using the previously saved cadena original
            # await getCadenaOriginal()


            # test_xml_name="cfdi_2023-09-09_15-36-41"
            getCadenaOriginal(xml_file_name)
            # xml_file_name = "cfdi_2023-09-09_15-36-41"


            with open(f"{current_working_directory}/storage/cadenaOriginal/cadena_original_{xml_file_name}.txt", "rb") as cadena_original_file:
                cadena_original_data = cadena_original_file.read()

            digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
            digest.update(cadena_original_data)
            digest_value = digest.finalize()

            # Sign the digest using the private key
            signature = private_key.sign(
                digest_value,
                padding.PKCS1v15(),
                utils.Prehashed(hashes.SHA256())
            )

            with open(f"{current_working_directory}/storage/sellos/digest_{xml_file_name}.txt", "wb") as digest_file:
                digest_file.write(signature)

            # Step 4: Generate the digital seal
            base64_encoded_seal = base64.b64encode(signature)

            with open(f"{current_working_directory}/storage/sellos/sello_{xml_file_name}.txt", "wb") as sello_file:
                sello_file.write(base64_encoded_seal)
            print(base64_encoded_seal) 
    else:
        if len(cer_files) == 0:
            print("No .cer files found in the folder.")
        else:
            print("Expected exactly one .cer file in the folder.")


getSelloShadow()