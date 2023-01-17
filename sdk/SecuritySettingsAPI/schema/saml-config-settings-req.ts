/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { SamlKey } from './saml-key';
    /**
     * Representation of the 'SamlConfigSettingsReq' schema.
     */
    export type SamlConfigSettingsReq = {
      /**
       * Use ADD to create a new key with the identifier keyId. Use UPDATE to make the key with the identifier keyId the active key. Use DELETE to remove the key with the identifier keyId from the list of available keys.
       */
      'changeMode'?: 'ADD' | 'UPDATE' | 'DELETE';
      /**
       * A key that is specified for a PATCH operation. The operation is either ADD, UPDATE, or DELETE.
       * @example "my-new-key"
       */
      'keyId'?: string;
      /**
       * If true, this zone doesn't validate the `InResponseToField` part of an incoming identity provider assertion.
       */
      'disableInResponseToCheck'?: boolean;
      'key'?: SamlKey;
    } | Record<string, any>;
