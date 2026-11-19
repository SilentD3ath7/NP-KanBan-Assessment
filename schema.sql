CREATE TABLE public.Tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text,
  status text,
  user_id uuid DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  description text,
  due_date date,
  assignee_id uuid DEFAULT auth.uid()
);

ALTER TABLE public.Tasks ADD CONSTRAINT Tasks_pkey PRIMARY KEY (id);

ALTER TABLE public.Tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable users to view their own data only" ON public.Tasks AS PERMISSIVE FOR SELECT TO authenticated USING ((( SELECT auth.uid() AS uid) = user_id));

CREATE POLICY "Enable insert for users based on user_id" ON public.Tasks AS PERMISSIVE FOR INSERT TO public WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));