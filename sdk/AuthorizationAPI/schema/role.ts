/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { RoleAttribute } from './role-attribute';
    import type { RoleCollectionReference } from './role-collection-reference';
    import type { Scope } from './scope';
    /**
     * Representation of the 'Role' schema.
     */
    export type Role = {
      /**
       * @example "This is an example description of an application."
       */
      'appDescription'?: string;
      /**
       * @example "product list"
       */
      'appName'?: string;
      'attributeList'?: RoleAttribute[];
      /**
       * @example "This is the viewer role."
       */
      'description'?: string;
      'isReadOnly'?: boolean;
      /**
       * The name has a maximum length of 64 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9), underscore (_), period (.), and hyphen (-).
       * @example "ViewerRole"
       */
      'name'?: string;
      'roleCollectionReferences'?: RoleCollectionReference[];
      /**
       * @example "product-list!a314"
       */
      'roleTemplateAppId'?: string;
      /**
       * The name has a maximum length of 64 characters. Only the following characters are allowed: alphanumeric characters (aA-zZ) and (0-9), underscore (_), period (.), and hyphen (-).
       * @example "ViewerTemplate"
       */
      'roleTemplateName'?: string;
      'scopes'?: Scope[];
    } | Record<string, any>;
