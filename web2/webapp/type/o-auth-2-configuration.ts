/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'OAuth2Configuration' schema.
     */
    export type OAuth2Configuration = {
      'allowedproviders'?: string[];
      'autoapprove'?: boolean;
      'grant-types'?: string[];
      'redirect-uris'?: string[];
      /**
       * Format: "int32".
       */
      'refresh-token-validity'?: number;
      'system-attributes'?: string[];
      /**
       * Format: "int32".
       */
      'token-validity'?: number;
    } | Record<string, any>;
