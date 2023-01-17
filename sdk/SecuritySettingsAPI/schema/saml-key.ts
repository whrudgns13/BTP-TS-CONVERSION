/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'SamlKey' schema.
     */
    export type SamlKey = {
      'default-saml-key-99999'?: {
            /**
             * The private key of the SAML providers.
             * @example "confidential"
             */
            'key'?: string;
            /**
             * The private key password of the SAML provider. Reserved for future use.
             */
            'passphrase'?: string;
            /**
             * The certificate used to verify the authenticity of all communications.
             * @example "-----BEGIN CERTIFICATE-----kfsjdfnjkdsfjds...ndf8j38o-----END CERTIFICATE-----"
             */
            'certificate'?: string;
          } | Record<string, any>;
    } | Record<string, any>;
