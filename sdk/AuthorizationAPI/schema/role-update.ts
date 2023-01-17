/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { RoleAttribute } from './role-attribute';
    /**
     * Representation of the 'RoleUpdate' schema.
     */
    export type RoleUpdate = {
      'attributeList'?: RoleAttribute[];
      /**
       * The description has a maximum length of 1000 characters.
       */
      'description'?: string;
    } | Record<string, any>;
