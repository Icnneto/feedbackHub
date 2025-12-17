import * as UsersDB from '@/lib/data-access/users'
import { UserWithRelations, UserWithStats, ServiceResponse } from '@/lib/types'
import { User } from "@prisma/client";

export async function getUserById(
    id: string
): Promise<ServiceResponse<User>> {
    try {
        if (!id) {
            return { success: false, message: 'User ID is required' }
        };

        const user = await UsersDB.getUserById(id);

        if (!user) {
            return { success: false, message: 'User not found' }
        };

        return {
            success: true,
            message: 'User retrieved successfully',
            data: user
        }
    } catch (error) {
        console.error('Error in getUserById service', error);
        return {
            success: false,
            message: 'Error fetching user',
            error
        };
    }
};

export async function getUserByEmail(
    email: string
): Promise<ServiceResponse<User>> {
    try {
        if (!email) {
            return { success: false, message: 'email is required' }
        };

        const user = await UsersDB.getUserByEmail(email);

        if (!user) {
            return { success: false, message: 'User not found' }
        };

        return {
            success: true,
            message: 'User retrieved successfully',
            data: user
        }
    } catch (error) {
        console.error('Error in getUserByEmail service', error);
        return {
            success: false,
            message: 'Error fetching user',
            error
        };
    }
};

export async function getUserProfile(
    id: string
): Promise<ServiceResponse<UserWithRelations>> {
    try {
        if (!id) {
            return { success: false, message: 'User ID is required' }
        };

        const user = await UsersDB.getUserProfile(id);

        if (!user) {
            return { success: false, message: 'User not found' }
        };

        return {
            success: true,
            message: 'User profile retrieved successfully',
            data: user
        }
    } catch (error) {
        console.error('Error in getUserProfile service', error);
        return {
            success: false,
            message: 'Error fetching user profile',
            error
        };
    }
};

export async function getUserStats(
    id: string
): Promise<ServiceResponse<UserWithStats>> {
    try {
        if (!id) {
            return { success: false, message: 'User ID is required' }
        };

        const stats = await UsersDB.getUserStats(id);

        if (!stats) {
            return {
                success: false,
                message: 'User not found'
            }
        }

        return {
            success: true,
            message: 'User stats retrieved successfully',
            data: stats
        }
    } catch (error) {
        console.error('Error in getUserStats service', error);
        return {
            success: false,
            message: 'Error fetching user stats',
            error
        };
    }
};

export async function deleteUser(
    id: string
): Promise<ServiceResponse> {

    try {
        if (!id) {
            return { success: false, message: 'User ID is required' }
        };

        await UsersDB.deleteUser(id);

        return {
            success: true,
            message: 'User profile deleted successfully',
        }

    } catch (error) {
        console.error('Error in deleteUser service', error);
        return {
            success: false,
            message: `Error deleting user: ${id}`,
            error
        };
    }
}