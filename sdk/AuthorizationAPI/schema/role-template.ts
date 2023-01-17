/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AttributeReference } from './attribute-reference';
    import type { Role } from './role';
    /**
     * Representation of the 'RoleTemplate' schema.
     */
    export type RoleTemplate = {
      /**
       * @example "This is an example description of an application."
       */
      'appDescription'?: string;
      /**
       * The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
       * @example "product-list!a314"
       */
      'appId'?: string;
      /**
       * @example "product list"
       */
      'appName'?: string;
      'attribute-references'?: AttributeReference[];
      'default-role-name'?: string;
      'description'?: string;
      /**
       * The name has a maximum length of 64 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9) and underscore (_).
       */
      'name'?: string;
      'role-references'?: Role[];
      'scope-references'?: string[];
      'version'?: string;
    } | Record<string, any>;
