import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { HelloDto } from 'dto/hello.dto';
import { HelloReponseDto } from 'dto/helloResponse.dto';
import { InvalidNameFormatExceptionFilter } from 'src/exceptions/exception.filter';
import { MissingNameExceptionFilterFilter } from 'src/exceptions/missing-name-exception-filter.filter';
import { NameService } from 'src/services/name.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly nameService: NameService) {} // Inject NameService

    @Get(':name')
    getHello(@Param('name') name: string ): string {
        return `Hello, ${name}!`;
    }

    @Post()
    @UseFilters(MissingNameExceptionFilterFilter, InvalidNameFormatExceptionFilter)
    async postHello(@Body() helloDto: HelloDto): Promise<HelloReponseDto> {
        const isValid = await this.nameService.validateName(helloDto.name);
        if (!isValid) {
            throw new HttpException("Name property must be at least two characters long", HttpStatus.BAD_REQUEST)
        }
        if (!helloDto.name) {
            throw new HttpException("Missing name property!", HttpStatus.BAD_REQUEST)
        }
        if(/[^a-zA-Z]/.test(helloDto.name)){
            throw new HttpException("Error in name format", HttpStatus.BAD_REQUEST)
        }
        return {
            message: `Hello, ${helloDto.name}`,
            timestamp: Date.now()
        };
    }
}
