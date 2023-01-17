/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RoleTemplate } from './schema';
/**
 * Representation of the 'RoleTemplatesApi'.
 * This API is part of the 'AuthorizationAPI' service.
 */
export const RoleTemplatesApi = {
  /**
   * Returns information about all role templates of applications protected by the service instance of the Authorization and Trust Management service.
   * @param queryParameters - Object containing the following keys: showRoles.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleTemplates: (queryParameters?: {'showRoles'?: boolean}) => new OpenApiRequestBuilder<RoleTemplate[]>(
    'get',
    '/sap/rest/authorization/v2/apps/roletemplates',
    {
          queryParameters
        }
  ),
  /**
   * Returns information about all role templates for an application that is specified by the application ID.
   * @param appId - The ID of application.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleTemplateByAppName: (appId: string) => new OpenApiRequestBuilder<RoleTemplate[]>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/roletemplates',
    {
          pathParameters: { appId }
        }
  ),
  /**
   * Returns information about a role template of an application, which is specified by the application ID and the role template name.
   * @param appId - The ID of the application.
   * @param templateName - The name of the role template.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getRoleTemplateByName: (appId: string, templateName: string) => new OpenApiRequestBuilder<RoleTemplate>(
    'get',
    '/sap/rest/authorization/v2/apps/{appId}/roletemplates/{templateName}',
    {
          pathParameters: { appId, templateName }
        }
  )
};
