import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { EmailService } from 'src/config/nodemailer.service';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/pipe/ZodValidationPipe.pipe';
import {
  LoginDto,
  SendOtpDto,
  SignupDto,
  loginSchema,
  sendOtpSchema,
  signupSchema,
} from 'src/dto/user.dto';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { otpTemplate } from 'src/mails/authMail';
import { Response } from 'express';

@Controller('user')
export class UserController {
  private JWT_SECRET: string;

  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  @Post('send-otp')
  @UsePipes(new ZodValidationPipe(sendOtpSchema))
  async sendOtp(@Body() body: SendOtpDto) {
    const { email } = body;

    const userExists = await this.userService.findUser(email);

    if (userExists) {
      throw new BadRequestException('User already Exists');
    }

    let otp = otpGenerator.generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    const otpSave = await this.userService.createOtp(email, otp);

    await this.emailService.sendEmail(
      email,
      'Verification Mail from Blog App',
      otpTemplate(otp),
    );

    return {
      success: true,
      msg: 'OTP sent Successsfully',
      data: otpSave,
    };
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  async signup(@Body() body: SignupDto) {
    const { email, name, otp, password } = body;

    const userExists = await this.userService.findUser(email);

    if (userExists) {
      throw new BadRequestException('User already Exists');
    }

    const otpResponse = await this.userService.getOtp(email);

    if (!otpResponse) {
      throw new NotFoundException(`No OTP found for the email ${email}`);
    } else if (otp !== otpResponse.otp) {
      throw new UnauthorizedException('Wrong OTP, provide the latest OTP');
    }

    const hashedPassword = await bcrypt.hash(password, 18);

    const user = await this.userService.createUser(email, name, hashedPassword);

    await this.userService.deleteAllOtp(email);

    return {
      success: true,
      msg: 'User created Successfully',
      data: user,
    };
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;

    const user = await this.userService.findUser(email);

    if (!user) {
      throw new NotFoundException(`User not found with the email ${email}`);
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user.id, approved: true },
        this.JWT_SECRET,
        { expiresIn: '24h' },
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('token', token, options);
      return {
        success: true,
        msg: 'User LoggedIn Successfully',
        token,
      };
    } else {
      throw new UnauthorizedException('Incorrect Password');
    }
  }
}
