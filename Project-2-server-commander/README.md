
This is the read me file for Project 2
This Porject Covered What the 
The choice of an Ubuntu VM, the size selection process (including the B1s to B2ats_v2 detour caused by regional availability), the SSH connection, the Apache installation commands, and the final page content.


it also contains some of the Command line shell script that was ran 

CONNECTING VIA SSH
   ssh -i .pem filename" azureuser@YOUR_PUBLIC_IP
   Installing a web server
      sudo apt update
 Installing Apache
         sudo apt install apache2 -y

Checking if it is running
   sudo systemctl status apache2

   USING NANO TO EDIT MY FILES
      cat index.html
      saving my files
         sudo rm /var/www/html/index.html.save
         Moving my Edited nano file into the Apache Rendering File
            sudo mv /var/www/html/index.html.save /var/www/html/index.html

        Then the cleanup process to avoid unplanned Aure billing
