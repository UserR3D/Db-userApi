import { $Enums } from '@prisma/client';

interface bodyUser {
  id: number;
  email: string;
  password: string;
  role: $Enums.Role;
}
