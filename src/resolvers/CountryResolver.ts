import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    const country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOneBy({ code });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return Country.findBy({ continentCode });
  }
}
