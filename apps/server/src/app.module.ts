import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MinioModule } from './minio/minio.module';

import { PdfsModule } from './pdfs/pdfs.module';
import { VideosModule } from './videos/videos.module';
import { FlipbooksModule } from './flipbooks/flipbooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: true,
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUYCzFy39px0ip+YlGS3Kk+PeG4GAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZGM3Yzk4NjAtNzJiMy00NDQ2LWE5ZjItZTYwZmMxYzE2
YzI3IFByb2plY3QgQ0EwHhcNMjQwMzI0MTM0MDE4WhcNMzQwMzIyMTM0MDE4WjA6
MTgwNgYDVQQDDC9kYzdjOTg2MC03MmIzLTQ0NDYtYTlmMi1lNjBmYzFjMTZjMjcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMJZWa2h
3aN/zcVIwcUzDTbJERPD4LwEwtHXfyd89HnZ0vx8ucMF2hZuhreu9wFJ/jm4SzGF
ldqXIGv9y4XM2yK7fuYSFzy4IlWxEDaHYFDlGONkTgemfFeeoYKO+bumpIcEks7/
beq+MNk4oLEShUZtHz1SWIueO9NfC2yUauu3x07FqD3s58gqALtlaOtovSIqaFBI
JgxFpNio3ifJs1QsW2WQ8kKq0snhwdnOdcnfpZk9HDWffxnz4sisHHUN/QN4CcAV
YYc7sbl4JFdsRmyhoFQ+QITTkmjthFZ8uOh6RW2J8tOvKh4SMZRj37fF1SrqgpBP
dYaE7fu7enu0YVxmvuqrgaWZko1tgo8RsCtRnANZhRHMQ4kUisqhFSYaLEjzhmX4
o6S/LcJ5iXAEeKh/QH0+uiA+i6jA+oe3KAhoFBG7JEOVzkOF7yOuipmOsGPRziKY
7saRUW32RB5HrwYwmHfIPYgmXTezNlJt16QWEkxTCKzkrJs3DHcz3azKXwIDAQAB
oz8wPTAdBgNVHQ4EFgQUT4HI09izf+/kqi0gmmhA4nJ3RlEwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFQK1lzpTs/E/vY9
YlYY5JQhlD2+Gea/LtzpUK0kFLHTBHsj11Dj9AlXOA0R4ZhbU1JAYVhKsfIgt1H7
38g2l3kimo0ApoeyytxLzsVCUh+bbOj+V3r9UDyU3GZZoXrL21SlMUZqM56vqyLh
DbUvYFWJb0YZsZTzZiT5zzt29cy5wLfkDJbZYWH8VWg8w7AjtXQbauEAtE6DE6YZ
wiFmn8CLG5E00XBwnpkTn3xS5YwL5LebC7KuFZNb2dik/6aS6WvMPrzS6ImPdCTR
hx3dYbWGhfTYRrNjnPa50h2tp1ewmi6wFyxTmFQ9Wfn2SwIr3DffOQZVgAs7tN9+
Amd762IccFIKWIcISc4fUw1hr4wL9UEG1uIRKnHyiCEPcnr5zVVaSElog7qLYQCo
Uk1GIJ+aAxs/oxkx7vpfrnX+NMKULIqKw5sAcWjXbvBlmSuAdvx2WkjeSiNhLV+t
3pPcWLG2hOJddvt7MkMUxQy+PIuryoDOP1km2/AkHdQZGl7jXA==
-----END CERTIFICATE-----`,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MinioModule,
    PdfsModule,
    VideosModule,
    FlipbooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
