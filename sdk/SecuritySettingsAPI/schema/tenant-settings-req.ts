/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { TokenPolicySettingsReq } from './token-policy-settings-req';
    import type { SamlConfigSettingsReq } from './saml-config-settings-req';
    import type { LinksSettings } from './links-settings';
    /**
     * Representation of the 'TenantSettingsReq' schema.
     */
    export type TenantSettingsReq = {
      'iframeDomains'?: string;
      'tokenPolicySettings'?: TokenPolicySettingsReq;
      'samlConfigSettings'?: SamlConfigSettingsReq;
      'links'?: LinksSettings;
      /**
       * The parameter displays the default identity provider (IdP) of the current tenant.
       * @example "sap.default"
       */
      'defaultIdp'?: string;
      /**
       * Set to false to disable the fallback at logon that if the logon ID provided in the token by the identity provider is unknown, the service attempts to log on the user with the e-mail address from the token. When false, the service attempts to create a missing user if user creation at logon is allowed. Note that before you can switch this parameter from false to true again, ensure that e-mail addresses are unique among your shadow users.
       */
      'treatUsersWithSameEmailAsSameUser'?: boolean;
      /**
       * For cross-origin resource sharing, this parameter enables you to set a comma-separated list of URLs returned in the Access-Control-Allow-Origin header. The service uses the value in the corsDefaultOrigin parameter for any requests that don't include the header string X-Requested-With. If you use wildcards, we recommend that you make your URLs as specific as possible. By using wildcards, you enable the application to access resources from multiple websites. Wildcards increase the risk of redirecting to malicious websites. The default value is .*, which allows any URL. For more information, see [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in the MDN Web Docs.
       * @example "https://www.example.com"
       */
      'corsDefaultOrigins'?: string;
      /**
       * For cross-origin resource sharing, this parameter enables you to set a comma-separated list of URLs returned in the Access-Control-Allow-Origin header. The service uses the value in the corsXhrOrigin parameter for any requests that include the header string X-Requested-With. If you use wildcards, we recommend that you make your URLs as specific as possible. By using wildcards, you enable the application to access resources from multiple websites. Wildcards increase the risk of redirecting to malicious websites. The default value is .*, which allows any URL. For more information, see [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in the MDN Web Docs.
       * @example "https://www.example.com"
       */
      'corsXhrOrigins'?: string;
    } | Record<string, any>;
