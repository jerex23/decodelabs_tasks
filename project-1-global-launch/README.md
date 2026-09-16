Project 1: The Global Launch
Scenario

A freelance developer needs to host a personal portfolio site for a client. The client wants the site to load quickly worldwide without paying for a dedicated server.

What a static website is

A static website is made entirely of files such as HTML and CSS, with no backend code or database running behind it. Because there is nothing that needs to process requests or maintain state, the files can be handed to a storage service and served directly to visitors. This removes the need for a server that stays on and billed around the clock, since a browser only needs to fetch and display the files as they are.

Why Azure Blob Storage over AWS S3

Both services offer a static website hosting feature built into their storage products. Azure Blob Storage was chosen here to build practical experience with the Azure platform, and because its static website feature automatically configures public read access on the hosting container once enabled, removing a manual permissions step that AWS S3 requires by comparison.

Steps taken
Created a storage account in the Azure Portal, using the Standard performance tier and locally redundant storage, since neither high throughput nor multi region redundancy was needed for this workload.
Enabled Static Website hosting on the storage account, setting index.html as the index document.
Enabling this feature automatically created a container named $web.
Uploaded index.html and style.css into the $web container.
Verified the site loaded correctly at the primary endpoint Azure generated.
Live endpoint

[Insert your storage account's primary endpoint URL here, e.g. https://yourstorageaccount.z13.web.core.windows.net/]

Public access

Azure automatically sets the $web container to allow anonymous public read access for blobs as soon as static website hosting is enabled. No manual bucket policy or access rule needed to be written for the site to become publicly reachable, which is a meaningful difference from providers where public access must be granted explicitly.
