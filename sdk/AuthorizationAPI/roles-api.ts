/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Role, RoleUpdate } from './schema';
/**
 * Representation of the 'RolesApi'.
 * This API is part of the 'AuthorizationAPI' service.
 */
export const RolesApi = {
  /**
   * Create a role for an application based on a role template. You must define the role name and description as well as identify the application and the role template name that you want to include in the role. The role inherits the scopes of the role template. Refer to the model below to see limitations for individual parameter values.
   * @param body - The content of the role, including a name, description, the role template, and the application that defines the role template.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createRole: (body: Role) => new OpenApiRequestBuilder<Role | Role>(
    'post',
    '/sap/rest/authorization/v2/apps/roles',
    {
          body
        }
  ),
  /**
   * Returns all roles of an application specified by the application ID.
   * @param appId - The application ID of the application to check for roles.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRolesByAppId: (appId: string) => new OpenApiRequestBuilder<Role[]>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/roles',
    {
          pathParameters: { appId }
        }
  ),
  /**
   * Returns the information about a role specified by the application ID, role template, and role name. The information includes the scopes contained in the role.
   * @param appId - The application ID of the application.
   * @param roleName - Name of the role.
   * @param templateName - Name of the role template.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleByAppAndRoleTemplate: (appId: string, roleName: string, templateName: string) => new OpenApiRequestBuilder<Role>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}',
    {
          pathParameters: { appId, roleName, templateName }
        }
  ),
  /**
   * Update the description of a role specified by application ID, role template name, and role name. Refer to the model below to see limitations for individual parameter values.
   * @param appId - The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @param roleName - The name of the role.
   * @param templateName - The Name of the role template.
   * @param body - The content of the role. You can change the description.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateRole: (appId: string, roleName: string, templateName: string, body: RoleUpdate) => new OpenApiRequestBuilder<Role>(
    'put',
    '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}',
    {
          pathParameters: { appId, roleName, templateName },
          body
        }
  ),
  /**
   * Deletes a role specified by the application ID, role template name, and role name.
   * @param appId - The application ID is the xsappname plus the identifier, which consists of an exclamation mark (!), an identifier for the plan underwhich the application is deployed, and an index number.
   * @param roleName - The name of the role.
   * @param templateName - The name of the role template.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRoleByRoleName: (appId: string, roleName: string, templateName: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}/roles/{roleName}',
    {
          pathParameters: { appId, roleName, templateName }
        }
  ),
  /**
   * Returns all application roles for all service instances, which are registered at UAA as OAuth2 client. The roles that are returned are limited to the subaccount credentials that are used for this request.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoles: () => new OpenApiRequestBuilder<Role[]>(
    'get',
    '/sap/rest/authorization/v2/roles'
  )
};
