<?php

namespace StrSocial\Bundle\LocalizationBundle\Component\Authentication\Handler;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;


/**
 * draft of an authentication handler to set timezone into session at signin
 */
class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{

    protected $router;
    protected $security;

    public function __construct(Router $router, SecurityContext $security)
    {
        $this->router = $router;
        $this->security = $security;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
    }

}
