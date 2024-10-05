import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiAuth = (() => {
    return applyDecorators(
        ApiResponse({
            status: 401,
            description: 'Missing or invalid authentication token'
          }),
        ApiResponse({
            status: 403,
            description: 'Missing role or invalid role'
          }),
        ApiResponse({
            status: 500,
            description: 'Internal server error'
          })
    )
})