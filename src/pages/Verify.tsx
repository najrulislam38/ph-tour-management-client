import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSentOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your submitted OTP must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const [email] = useState(location.state);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [sendOtp] = useSentOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");
    setConfirm(true);
    setTimer(120);
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent Successfully.", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: z.infer<typeof OTPFormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        toast.success("Your Email Verification Successful.", { id: toastId });
        setTimer(0);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  // useEffect(() => {
  //   if (!email || !confirm) return;

  //   const timerId = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));

  //     console.log("trick");

  //     return () => clearInterval(timerId);
  //   }, 1000);
  // }, [email, confirm]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!email || !confirm) return;
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("trick");
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, confirm]);

  return (
    <div className="grid place-content-center h-screen">
      {confirm ? (
        <Card className=" min-w-80  ">
          <CardHeader>
            <CardTitle className="text-xl capitalize">
              Verify your email address
            </CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP Enter Here</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <span className="font-bold tex-xl"> - </span>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant={"link"}
                          className={cn(
                            "p-0 m-0",
                            timer === 0 ? "cursor-pointer" : "text-gray-500"
                          )}
                          disabled={timer !== 0}
                        >
                          Resend OTP
                        </Button>{" "}
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className=" min-w-80 ">
          <CardHeader>
            <CardTitle className="text-xl capitalize">
              Verify your email address
            </CardTitle>
            <CardDescription>
              We will send you an OTP at{" "}
              <span className="text-lg">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Button onClick={handleSendOtp} className="">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
