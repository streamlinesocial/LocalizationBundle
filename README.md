Modify the following files on your Symfony project to enable this bundle:

1. in app/AppKernel.php

```php
class AppKernel extends Kernel
{
	public function registerBundles(){
		$bundles = array(
			new StrSocial\Bundle\LocalizationBundle\StrSocialLocalizationBundle(),
		);
	}
}
```

2. app/config/routing.yml 
```yml
	str_social_localization_bundle:
		resource: "@StrSocialLocalizationBundle/Controller/"
		type:     annotation
		prefix:   /
```

3. add l10n js scripts to your twig

```twig
{% javascripts
    '@StrSocialLocalizationBundle/Resources/public/js/vendor/*'
    '@StrSocialLocalizationBundle/Resources/public/js/*'
%}
    <script type="text/javascript" src="{{ asset_url }}"></script>
{% endjavascripts %}
```

4. to easily activate the feature from the frontend, add this to your js script
```js
$(document).ready(function(){
	StrSocialL10n.fn.postTimeZoneAndReloadPageIfNeeded();
});
```
