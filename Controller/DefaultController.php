<?php

namespace StrSocial\Bundle\LocalizationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller as SymfonyController;


/**
 * @Route("/l10n")
 */
class DefaultController extends SymfonyController
{

    /**
     * @Route("/timezone", name="get_session_timezone")
     * @Method("GET")
     */
    public function getSessionTimezone()
    {
        $this->auth();
        $request = $this->getRequest();
        $session = $request->getSession();
        $tz = $session->get('timezone');
        
        if( !$tz ){
            return new Response(null,404);
        }
        return new Response( json_encode( array('timezone' => $tz) ), 200);
    }
    
    /**
     * @Route("/gmt-offset", name="set_gmt_offset")
     * @Method("POST")
     */
    public function setSessionTimezone()
    {
        $this->auth();
        $request = $this->getRequest();
        $session = $request->getSession();
        $tzOffset = $request->request->get('timezone');
        if( ! is_numeric( $tzOffset ) ){
            return new Response(null, 400);
        }else{
            $tzOffset = intval( $tzOffset )*60*60;
            $timezonesArr = \DateTimeZone::listAbbreviations();
            
            foreach( $timezonesArr as $category => $tz ){
                if( $tz[0]['offset'] == $tzOffset ){
                    $timeZoneId = $tz[0]['timezone_id'];
                    break;
                }
            }
            $session->set('timezone', $timeZoneId );
            return new Response(null,204);
        }
    }
}
