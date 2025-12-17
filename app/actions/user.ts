'use server'
import { getUserById, getUserByEmail, getUserProfile, getUserStats, deleteUser } from "@/lib/services/user/user-service"
import { ServiceResponse, UserWithRelations, UserWithStats } from "@/lib/types"
import { checkIdSchema, getUserByEmailSchema, safeValidate } from "@/lib/utils/validation";
import { User } from "@prisma/client";

export async function getUserByIdAction(formData: FormData): Promise<ServiceResponse<User>> {
    const data = {
        id: formData.get('id')
    }

    const validation = safeValidate(checkIdSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await getUserById(validation.data.id);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    };

    return {
        success: true,
        message: result.message,
        data: result.data
    }

};

export async function getUserByEmailAction(formData: FormData): Promise<ServiceResponse<User>> {
    const data = {
        email: formData.get('email')
    }

    const validation = safeValidate(getUserByEmailSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await getUserByEmail(validation.data.email);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    };

    return {
        success: true,
        message: result.message,
        data: result.data
    }

};

export async function getUserProfileAction(formData: FormData): Promise<ServiceResponse<UserWithRelations>> {
    const data = {
        id: formData.get('id')
    }

    const validation = safeValidate(checkIdSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await getUserProfile(validation.data.id);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    };

    return {
        success: true,
        message: result.message,
        data: result.data
    }
};

export async function getUserStatsAction(formData: FormData): Promise<ServiceResponse<UserWithStats>> {
    const data = {
        id: formData.get('id')
    }

    const validation = safeValidate(checkIdSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await getUserStats(validation.data.id);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    };

    return {
        success: true,
        message: result.message,
        data: result.data
    }
};

export async function deleteUserAction(formData: FormData): Promise<ServiceResponse> {
    const data = {
        id: formData.get('id')
    }

    const validation = safeValidate(checkIdSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await deleteUser(validation.data.id);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    };

    return {
        success: true,
        message: result.message,
    }
};