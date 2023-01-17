/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'RoleReference' schema.
     */
    export type RoleReference = {
      /**
       * @example "product-list!a314"
       */
      'roleTemplateAppId'?: string;
      /**
       * The name has a maximum length of 64 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9), underscore (_), period (.), and hyphen (-).
       * @example "ViewerTemplate"
       */
      'roleTemplateName'?: string;
      /**
       * @example "This role enabled the user to acces the view the application data."
       */
      'description'?: string;
      /**
       * @example "Viewer"
       */
      'name'?: string;
    } | Record<string, any>;
