import base64


from cryptography.hazmat.primitives import serialization, hashes
from lxml import etree

from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding, utils

import os
import OpenSSL.crypto

current_working_directory=os.getcwd()
print("Current working directory:", current_working_directory)

parent_directory = os.path.abspath(os.path.join(current_working_directory, ".."))
print(f'parent_directory: {parent_directory}')

xml_file_name="cfdi_2023-08-06_16-31-44"

def getCadenaOriginal():
    # Load the XML source document and XSL stylesheet
    
    xml_file_path = r"C:\Users\dsczk\OneDrive\Documents\Proyecto X\Backend bueno\BackendScooter mysql\BackendScooter\storage\documentos\cfdi_2023-08-06_16-31-44.xml"

    print(f'xml_file_name {xml_file_path}')
    try:
        xml_doc = etree.parse(xml_file_path)
        # Now you can work with the parsed XML document
    except FileNotFoundError:
        print(f"XML file not found {xml_file_name}.")
    except etree.ParseError:
        print(f"Error parsing XML {xml_file_name}.")
    xsl_doc = etree.parse('http://www.sat.gob.mx/sitio_internet/cfd/4/cadenaoriginal_4_0/cadenaoriginal_4_0.xslt')

    # Create an XSLT transformer
    transformer = etree.XSLT(xsl_doc)

    # Perform the transformation
    result_tree = transformer(xml_doc)

    # Convert the result tree to a string
    result_str = str(result_tree)

    # Save the transformed output to a text file
    output_directory = os.path.join(parent_directory, "BackendScooter mysql", "BackendScooter", "storage", "cadenaOriginal")
    output_file_path = os.path.join(output_directory, f'cadena_original_{xml_file_name}.txt')
    output_file_path = os.path.normpath(output_file_path)  # Normalize the path

    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        output_file.write(result_str)

    print(f"Transformation complete. Transformed output saved to '{output_file_path}'.")



def getSelloShadow():

    # Step 1: Convert the certificate to PEM format
    with open("../storage/credentials/CSD_Sucursal_1_EKU9003173C9_20230517_223850.cer", "rb") as cert_file:
        cert_data = cert_file.read()

    cert = x509.load_der_x509_certificate(cert_data, default_backend())
    cert_pem = cert.public_bytes(encoding=serialization.Encoding.PEM)

    with open("../storage/credentials/EKU9003173C9.cer.pem", "wb") as pem_file:
        pem_file.write(cert_pem)

    # Step 2: Convert the private key to PEM format
    with open("../storage/credentials/CSD_Sucursal_1_EKU9003173C9_20230517_223850.key", "rb") as key_file:
        key_data = key_file.read()

    private_key = serialization.load_der_private_key(key_data, password=b'12345678a', backend=default_backend())
    private_key_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    with open("../storage/credentials/EKU9003173C9.key.pem", "wb") as pem_file:
        pem_file.write(private_key_pem)

    # Step 3: Generate the Digest using the previously saved cadena original
    with open(f"../storage/cadenaOriginal/cadena_original_{xml_file_name}.txt", "rb") as cadena_original_file:
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

    with open(f"../storage/sellos/digest_{xml_file_name}.txt", "wb") as digest_file:
        digest_file.write(signature)

    # Step 4: Generate the digital seal
    base64_encoded_seal = base64.b64encode(signature)

    with open(f"../storage/sellos/sello_{xml_file_name}.txt", "wb") as sello_file:
        sello_file.write(base64_encoded_seal)

def encodeCertificadoBase64():

    # Lee el archivo de certificado en formato binario
    with open("/storage/credentials/CSD_Sucursal_1_EKU9003173C9_20230517_223850.cer", "rb") as cert_file:
        cert_data = cert_file.read()

    # Codifica los datos del certificado en formato base64
    cert_base64 = base64.b64encode(cert_data).decode("utf-8")

    # Guarda la cadena base64 en un archivo
    with open("../storage/credentials/certificado_base64.txt", "w", encoding="utf-8") as base64_file:
        base64_file.write(cert_base64)

    print("Certificado codificado en base64 y guardado en 'storage/credencials/certificado_base64.txt'.")


getCadenaOriginal()
#getSelloShadow()