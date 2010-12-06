Installation
------------
### Prerequisites
*	A web server

### Clone repository
1.	Open a command prompt
2.	change to the base directory where you cloned [Argos SDK][argos-sdk], eg:  

		cd \projects\sage\mobile
3.	Execute the following commands (clone command shown with READ-ONLY URL; if you are a commiter, use the appropriate Read+Write URL).

		cd products
		git clone git://github.com/SageScottsdalePlatform/argos-saleslogix.git
4.	On your web server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the base directory where you cloned [Argos SDK][argos-sdk], eg:
	
		cd \projects\sage\mobile
5.	In your browser, navigate to the path `/mobile/products/argos-saleslogix/index-dev.html` on your web server, eg:

		http://localhost/mobile/products/argos-saleslogix/index-dev.html

### Building A Release Version 

#### Requirements
*	Windows 
*	The Java Runtime (JRE)
*	The environment variable, `JAVA_HOME`, pointing to the JRE base path, eg:

		c:\Program Files (x86)\Java\jre6

#### Steps
1.	Save this [gist](http://gist.github.com/457984) as `build-product.cmd` to directory where you cloned [Argos SDK][argos-sdk].
2.	Open a command prompt and excute the following, changing paths as appropriate, eg:

		cd \projects\sage\mobile
		build-product saleslogix
3.	The deployed product will be in a `deploy` folder in the directory where you cloned [Argos SDK][argos-sdk].

### Deploying 

#### Steps
1.	Open the deploy folder for the product, eg:

		mobile\deploy\argos-saleslogix
2.	If the mobile content is going to be hosted on a different server, the manifest file and the environment file must be changed (or a new one created).
	1.	In the `index.manifest` file at the root of the deployed site, add the full SData server URL, including the trailing slash, to the end of the `NETWORK:` section, eg:
	
			NETWORK:
			../sdata/
			http://mysdataserver/sdata/
	2.	Modify the environment file, `environment/default.js`, to point to the appropriate SData server.  If a new environment file was created, it must be added to the files:
		*	index.manifest
		*	index.html
		*	index-nocache.html
	3.	Copy the entire contents of the product's deploy folder (eg: `mobile\deploy\argos-saleslogix`) to a location on the webserver that will be hosting the mobile content (hereafter, mobile server).
	4.	On the mobile server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the directory where you copied the content to.  In the recommended configuration, on the same server where SData is being hosted, this mapping should be at the same level as the `sdata` mapping.
	5.	On the mobile server, ensure that the MIME type corresponding to the `.manifest` extension is `text/cache-manifest`.  This is a requirement for application caching/offline access.
	6.	If SData is being hosted on a different server than the mobile host, CORS (Cross Origin Resource Sharing), must be enabled on the SData server.
	
[argos-sdk]: https://github.com/SageScottsdalePlatform/argos-sdk "Argos SDK Source"