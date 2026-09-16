Project 2: The Server Commander
Scenario

A startup is launching a dynamic application and needs a dedicated server environment with full control over the operating system, so it can install custom software and apply security patches directly.

Choice of Ubuntu VM

An Ubuntu Server LTS image was selected for the virtual machine. LTS stands for Long Term Support, meaning the release receives updates and patches for an extended period, which makes it a stable choice for a server meant to run continuously.

Size selection

The original plan was to use the B1s size, the smallest and cheapest general purpose tier and one of the sizes covered by Azure's free monthly compute hours. B1s was unavailable in the region originally selected, since Azure's B series sizes are not offered in every region and B1s specifically has been undergoing retirement in several regions. After checking size availability and quota, the VM was launched instead on Standard_B2ats_v2, another size explicitly listed among Azure's free tier eligible options.

Connecting over SSH

Connection used the private key generated during VM creation, from a Windows terminal:

ssh -i "path\to\your-key.pem" azureuser@YOUR_VM_PUBLIC_IP

The first connection attempt returned a permission denied error, traced to two separate causes: the key file path did not match the actual downloaded filename, and the username used did not match the account name set during VM creation. Correcting the file path and username resolved the connection.

Installing the web server

Run directly on the VM once connected:

sudo apt update
sudo apt install apache2 -y
sudo systemctl status apache2
Final page content

The default Apache page at /var/www/html/index.html was replaced with a custom welcome page using sudo nano /var/www/html/index.html:

html
<!DOCTYPE html>
<html>
<head><title>DecodeLabs</title></head>
<body>
    <h1>Welcome to DecodeLabs</h1>
    <p>This server was provisioned and configured by Jeremy.</p>
</body>
</html>

An interrupted save in nano initially left this content in a separate index.html.save file rather than the live index.html. This was resolved by moving the saved content into place with sudo mv /var/www/html/index.html.save /var/www/html/index.html, after which the custom page loaded correctly at the VM's public IP address.
