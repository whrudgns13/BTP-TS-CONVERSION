/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'SamlAttrAssignment' schema.
     */
    export type SamlAttrAssignment = {
      /**
       * @example "5c70993f-a010-8509-8bb5-ec11dbb992c4"
       */
      'roleCollectionIdentityZone'?: string;
      /**
       * @example "ADMINS"
       */
      'roleCollectionName'?: string;
      /**
       * This parameter is deprecated.
       * @example "This parameter is deprecated."
       */
      'samlAttrName'?: string;
      /**
       * The name of the attribute parameter.
       * @example "Country"
       */
      'attributeName'?: string;
      /**
       * This parameter is deprecated.
       * @example "This parameter is deprecated."
       */
      'samlAttributeValue'?: string;
      /**
       * The value of the attribute.
       * @example "DE"
       */
      'attributeValue'?: string;
      /**
       * The operator value that matches the attribute name to its value.
       * @example "equals"
       */
      'comparisonOperator'?: string;
      /**
       * @example "https://accounts.sap.com"
       */
      'samlEntityId'?: string;
    } | Record<string, any>;
