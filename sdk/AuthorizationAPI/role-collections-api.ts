/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleCollection, RoleCollectionDescription, Role, RoleReference } from './schema';
/**
 * Representation of the 'RoleCollectionsApi'.
 * This API is part of the 'AuthorizationAPI' service.
 */
export const RoleCollectionsApi = {
  /**
   * Returns all role collections, which exist within the current subaccount.
   * @param queryParameters - Object containing the following keys: showGroups, showRoles, showUsers.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollections: (queryParameters?: {
    'showGroups'?: boolean,
    'showRoles'?: boolean,
    'showUsers'?: boolean
  }) => new OpenApiRequestBuilder<RoleCollection[]>(
    'get',
    '/sap/rest/authorization/v2/rolecollections',
    {
      queryParameters
    }
  ),
  /**
   * Creates a role collection. You must include a role name at a minimum. The description is created as null if you don't include one. You can include role references as defined by the role name, the application ID, and role template name. To assign group members, use the /Groups endpoint. Groups are mapped to role collections in the Authorization and Trust Management service. For more information, see [Add Member](https://docs.cloudfoundry.org/api/uaa/version/74.4.0/index.html#add-member) in the documentation of Cloud Foundry or [User Management SCIM](https://api.sap.com/api/PlatformAPI/resource) SAP API Business Hub. Refer to the model below to see limitations for individual parameter values.
   * @param body - The content of the role collection.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createRoleCollection: (body: RoleCollection) => new OpenApiRequestBuilder<any | any>(
    'post',
    '/sap/rest/authorization/v2/rolecollections',
    {
      body
    }
  ),
  /**
   * Returns all role collections, which exist within the current subaccount. The result in paged, enabling you to handle large responses.
   * @param queryParameters - Object containing the following keys: showGroups, showRoles, showUsers.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollectionsByPaging: (queryParameters?: {
    'showGroups'?: boolean,
    'showRoles'?: boolean,
    'showUsers'?: boolean
  }) => new OpenApiRequestBuilder<RoleCollection[]>(
    'get',
    '/sap/rest/authorization/v2/rolecollections/pages',
    {
      queryParameters
    }
  ),
  /**
   * Returns the specified page of role collection search result. The role collections are the result of a previous paged GET request for role collections of the current subaccount.
   * @param pageId - The ID of a paged search result. The initial page of a result is 0. The following pages are identified by a sequential integer.
   * @param queryParameters - Object containing the following keys: showGroups, showRoles, showUsers.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollectionsByPaging2: (pageId: string, queryParameters?: {
    'showGroups'?: boolean,
    'showRoles'?: boolean,
    'showUsers'?: boolean
  }) => new OpenApiRequestBuilder<RoleCollection[]>(
    'get',
    '/sap/rest/authorization/v2/rolecollections/pages/{pageId}',
    {
      pathParameters: { pageId },
      queryParameters
    }
  ),
  /**
   * Returns information about a role collection identified by the name of the role collection.
   * @param roleCollectionName - The name of collection to be returned.
   * @param queryParameters - Object containing the following keys: withUsers.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleCollectionByName: (roleCollectionName: string, queryParameters?: { 'withUsers'?: boolean }) => new OpenApiRequestBuilder<RoleCollection>(
    'get',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}',
    {
      pathParameters: { roleCollectionName },
      queryParameters
    }
  ),
  /**
   * Updates the description of a role collection specified by the name of the role collection. You can't change any other attribute of the role collection. Refer to the model below to see limitations for individual parameter values.
   * @param roleCollectionName - The name of the role collection.
   * @param body - The content of the role collection description. The description has a maximum length of 1000 characters.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  changeRoleCollectionDescription: (roleCollectionName: string, body: RoleCollectionDescription) => new OpenApiRequestBuilder<Record<string, any>>(
    'put',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}',
    {
      pathParameters: { roleCollectionName },
      body
    }
  ),
  /**
   * Deletes a role collection specified by the name of the role collection.
   * @param roleCollectionName - The name of the role collection to be deleted.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRoleCollectionByName: (roleCollectionName: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}',
    {
      pathParameters: { roleCollectionName }
    }
  ),
  /**
   * Returns information about the roles of a role collection specified by the name of the role collection.
   * @param roleCollectionName - Name of the role collection
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRolesByRoleCollectionName: (roleCollectionName: string) => new OpenApiRequestBuilder<Role[]>(
    'get',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles',
    {
      pathParameters: { roleCollectionName }
    }
  ),
  /**
   * Updates a role collection with an array of roles. Specify the roles by role name, application ID, and role template name. These roles are added to the roles already included in the role collection.
   * @param roleCollectionName - The name of the role collection to update.
   * @param body - The list of role references in an array, specified by the role name, application ID, and role template name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addRolesToRoleCollection: (roleCollectionName: string, body: RoleReference[]) => new OpenApiRequestBuilder<Record<string, any>>(
    'put',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles',
    {
      pathParameters: { roleCollectionName },
      body
    }
  ),
  /**
   * Adds a role reference, specified by role name, application ID, and role template name, to a role collection.
   * @param roleCollectionName - The name of the role collection to update. The name has a maximum length of 64 characters.
   * @param roleName - The name of the role to add to the role collection.
   * @param roleTemplateAppId - The application ID, with which the role is associated. The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @param roleTemplateName - The name of the role template, with which the role is associated.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addRoleToRoleCollection: (roleCollectionName: string, roleName: string, roleTemplateAppId: string, roleTemplateName: string) => new OpenApiRequestBuilder<any>(
    'put',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles/{roleTemplateAppId}/{roleName}/{roleTemplateName}',
    {
      pathParameters: { roleCollectionName, roleName, roleTemplateAppId, roleTemplateName }
    }
  ),
  /**
   * Deletes a role specified by the role reference from a role collection.
   * @param roleCollectionName - The name of the role collection to update.
   * @param roleName - The name of the role to remove from the role collection.
   * @param roleTemplateAppId - The application ID, with which the role is associated. The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @param roleTemplateName - The name of the role template, with which the role is associated.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRoleFromRoleCollection: (roleCollectionName: string, roleName: string, roleTemplateAppId: string, roleTemplateName: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/sap/rest/authorization/v2/rolecollections/{roleCollectionName}/roles/{roleTemplateAppId}/{roleName}/{roleTemplateName}',
    {
      pathParameters: { roleCollectionName, roleName, roleTemplateAppId, roleTemplateName }
    }
  )
};
