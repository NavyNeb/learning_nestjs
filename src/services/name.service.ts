/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class NameService {
    validateName(name: string): boolean {
        return name.length > 2; // Minimum length of two characters
    }
}
