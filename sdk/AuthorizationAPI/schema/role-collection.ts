/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { GroupReference } from './group-reference';
    import type { RoleReference } from './role-reference';
    import type { UserReference } from './user-reference';
    import type { SamlAttrAssignment } from './saml-attr-assignment';
    /**
     * Representation of the 'RoleCollection' schema.
     */
    export type RoleCollection = {
      /**
       * The name has a maximum length of 64 characters.
       * @example "ProductListViewer"
       */
      'name'?: string;
      /**
       * The description has a maximum length of 1000 characters.
       * @example "Enables users to view the items available for ordering in the user interface."
       */
      'description'?: string;
      'groupReferences'?: GroupReference[];
      'roleReferences'?: RoleReference[];
      'userReferences'?: UserReference[];
      'samlAttrAssignment'?: SamlAttrAssignment[];
      'isReadOnly'?: boolean;
    } | Record<string, any>;
