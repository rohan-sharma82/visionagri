-- Enable Row Level Security for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to prevent conflicts
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

-- Create a policy that allows authenticated users to insert their own profile.
-- The `auth.uid()` function gets the ID of the currently logged-in user.
-- The policy checks if the `id` of the row being inserted matches the user's ID.
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create a policy that allows users to view their own profile information.
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Create a policy that allows users to update their own profile information.
CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Enable Row Level Security for the yield_predictions table
ALTER TABLE public.yield_predictions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own yield predictions." ON public.yield_predictions;

-- Create a policy that allows users to insert, view, update, and delete their own yield predictions.
CREATE POLICY "Users can manage their own yield predictions."
ON public.yield_predictions FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security for the chats table
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own chats." ON public.chats;

-- Create a policy that allows users to manage their own chat history.
CREATE POLICY "Users can manage their own chats."
ON public.chats FOR ALL
USING (auth.uid()::text = user_id)
WITH CHECK (auth.uid()::text = user_id);
