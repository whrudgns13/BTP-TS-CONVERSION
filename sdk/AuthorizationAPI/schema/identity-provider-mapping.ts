/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'IdentityProviderMapping' schema.
     */
    export type IdentityProviderMapping = {
      /**
       * The name of the attribute that you want to add.
       * @example "Country"
       */
      'attributeName'?: string;
      /**
       * The value of the attribute that you want to add.
       * @example "US"
       */
      'attributeValue'?: string;
      /**
       * The operator value that matches the attribute name to its value.
       * @example "equals"
       */
      'operator'?: string;
      /**
       * The name of the role collection.
       * @example "ADMINS"
       */
      'roleCollectionName'?: string;
    } | Record<string, any>;
