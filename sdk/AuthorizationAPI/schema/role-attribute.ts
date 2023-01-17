/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'RoleAttribute' schema.
     */
    export type RoleAttribute = {
      /**
       * The name has a maximum length of 64 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9) and underscore (_).
       */
      'attributeName'?: string;
      'attributeValueOrigin'?: string;
      'attributeValues'?: string[];
      'description'?: string;
      'valueRequired'?: boolean;
    } | Record<string, any>;
