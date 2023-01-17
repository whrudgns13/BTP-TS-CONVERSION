/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { TenantSettingsResp, TenantSettingsReq } from './schema';
/**
 * Representation of the 'SecuritySettingsApi'.
 * This API is part of the 'SecuritySettingsAPI' service.
 */
export const SecuritySettingsApi = {
  /**
   * Returns the security settings of the current tenant. The settings include information about the signing key for SAML tokens and the signing key for access tokens.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readSettings: () => new OpenApiRequestBuilder<TenantSettingsResp[]>(
    'get',
    '/sap/rest/authorization/v2/securitySettings'
  ),
  /**
   * Updates the security settings of the current tenant, for example the signing key for SAML token or the signing key for access tokens.
   * @param body - Configuration of the security settings in JSON format.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateSettings: (body: TenantSettingsReq) => new OpenApiRequestBuilder<TenantSettingsResp>(
    'patch',
    '/sap/rest/authorization/v2/securitySettings',
    {
          body
        }
  )
};
