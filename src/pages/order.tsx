import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  items: z.string().min(2, "Please specify items"),
  message: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export default function Order() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      items: "",
      message: "",
    },
  });

  async function onSubmit(data: OrderFormValues) {
  setLoading(true);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "7b6201bd-c2bb-4cb7-b5f1-209cd690a0b1",

        subject: "New Order Inquiry - EROS",

        name: data.name,
        email: data.email,
        phone: data.phone,
        items: data.items,
        message: data.message || "",

        source: "EROS Order Form",
      }),
    });

    const result = await response.json();

    if (result.success) {
      setSubmitted(true);
      form.reset();
    } else {
      console.error(result);
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-[100dvh] pt-44 pb-24 px-6 bg-background flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white uppercase mb-4">Acquire</h1>
          <p className="text-white/50 text-lg">Submit an inquiry for the Kiss or Heartz drop. Limited runs, never restocked. We'll reach out to confirm size, payment, and pickup or delivery anywhere in Trinidad & Tobago.</p>
        </motion.div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border p-12 text-center"
          >
            <h2 className="text-3xl font-display font-bold uppercase text-white mb-4">Inquiry Received</h2>
            <p className="text-white/60 mb-8">Sealed with a kiss. We'll be in touch shortly to confirm your size and arrange pickup or delivery across T&T.</p>
            <Button 
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest rounded-none"
            >
              Submit Another
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs font-bold">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="bg-transparent border-white/20 focus-visible:border-primary rounded-none text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 uppercase tracking-widest text-xs font-bold">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@email.com" {...field} className="bg-transparent border-white/20 focus-visible:border-primary rounded-none text-white h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 uppercase tracking-widest text-xs font-bold">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (868) 123-4567"
                          {...field}
                          className="bg-transparent border-white/20 focus-visible:border-primary rounded-none text-white h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 uppercase tracking-widest text-xs font-bold">Pieces of Interest</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Kiss Tee (M), Heartz Tee (L)" {...field} className="bg-transparent border-white/20 focus-visible:border-primary rounded-none text-white h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 uppercase tracking-widest text-xs font-bold">Pickup, Delivery or Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us your preferred area in T&T for delivery, or any sizing/styling questions..." {...field} className="bg-transparent border-white/20 focus-visible:border-primary rounded-none text-white min-h-[120px] resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-primary hover:text-white transition-colors duration-300 font-display font-bold uppercase tracking-widest h-14 text-lg rounded-none"
                >
                  {loading ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
