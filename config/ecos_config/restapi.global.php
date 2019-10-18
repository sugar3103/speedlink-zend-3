<?php

/**
 * Global Configuration 
 *
 */
return [
    'ApiRequest' => [
        'responseFormat' => [
            'statusKey' => 'error',
            'statusOkText' => false,
            'statusNokText' => true,
            'dataKey' => 'data',
            'messageKey' => 'message',
            'defaultMessageText' => 'Empty response!',
            'errorKey' => 'error_code',
            'defaultErrorText' => 'Unknown request!',
            'authenticationRequireText' => 'Authentication Required.',
            'pageNotFoundKey' => 'Request Not Found.',    
            'methodNotAllowedKey' => 'Method Not Allowed.'        
        ],
        'jwtAuth' => [
            'cypherKey' => 'R1a#2%dY2fX@3g8r5&s4Kf6*sd(5dHs!5gD4s',
            'tokenAlgorithm' => 'HS256',
            'expired' => '86400'
        ],
    ]
];
