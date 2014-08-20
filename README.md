Modify the following files on your Symfony project to enable this bundle:

1. in app/AppKernel.php

class AppKernel extends Kernel
{

    public function registerBundles()
    {
        $bundles = array(
		...
		new StrSocial\Bundle\LocalizationBundle\StrSocialLocalizationBundle(),
	);
    }
    
    ...
}


2. app/config/routing.yml 

str_social_localization_bundle:
    resource: "@StrSocialLocalizationBundle/Controller/"
    type:     annotation
    prefix:   /



