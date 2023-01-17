/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { SamlKey } from './saml-key';
    /**
     * Representation of the 'SamlConfigSettingsResp' schema.
     */
    export type SamlConfigSettingsResp = {
      /**
       * If true, this zone doesn't validate the `InResponseToField` part of an incoming identity provider assertion.
       */
      'disableInResponseToCheck'?: boolean;
      /**
       * The parameter contains a globally unique name for an identity provider or a service provider.
       * @example "https://example-tenant.authentication.eu10.hana.ondemand.com"
       */
      'entityID'?: string;
      /**
       * The ID of the key to be used for signing metadata and assertions.
       * @example "default-saml-key-99999"
       */
      'activeKeyId'?: string;
      'keys'?: SamlKey;
    } | Record<string, any>;
