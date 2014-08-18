<?php
namespace StrSocial\LocalizationBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Localization extension filters for twig
 */
class StrSocialLocalizationExtension extends \Twig_Extension
{
    protected $container;
    protected $timezone;
    
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->timezone = $this->container->get('session')->get('timezone', 'UTC');
    }
    
    
    public function getFilters()
    {
        return array(
            'local_date' => new \Twig_Filter_Method($this, 'localFilter'),
        );
    }
    
    /*
     * returns a formated string of a given date time with the local timezone
     */
    public function localFilter( \DateTime $date, $format = 'm/d/Y' )
    {
        $timezone = new \DateTimeZone($this->timezone);
        $date->setTimezone($timezone);
        return $date->format($format);
    }

    public function getName()
    {
        return 'localization';
    }
}